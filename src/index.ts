import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Plugin } from "rollup";
import { normalizePath } from "@rollup/pluginutils";

interface AutoInstallOptions {
  /**
   * 执行安装的bin
   *
   * @type {("npm" | "yarn")}
   * @memberof AutoInstallOptions
   */
  bin?: "npm" | "yarn";
}

export function autoInstallPlugin(optons?: AutoInstallOptions): Plugin {
  const bin = optons?.bin || "npm";
  const npmDir = "node_modules";
  const npmRoot = tryGetPkgDir(__dirname);
  return {
    name: "auto-install",
    resolveId(source, importer, options) {
      const normalizeSource = normalizePath(source);
      // 1. source校验
      if (
        !source || // 非空（保险点）
        /^\W?[./]/.test(normalizeSource) || // 非相对路径
        normalizeSource.includes(npmDir) // 不含node_modules
      ) {
        return null;
      }
      // 2. npm模块名处理&校验
      const match = source.match(/^((@\w+\/)?[^/]*)\/?.*$/);
      if (!match) {
        console.error("正则写错了o(╥﹏╥)o ... ", source, " 提个issue吧~");
        return null;
      }
      const module = match[1];

      // 3. 判断是否已经安装npm
      if (fs.existsSync(path.resolve(npmRoot, npmDir, module))) {
        return null;
      }

      // 4. 开始安装
      console.info("Installing %s... ", module);
      const output = execSync(`${bin} install ${module}`, {
        encoding: "utf-8",
        timeout: 60000,
        stdio: ["ignore", "pipe", "inherit"],
      });
      if (output.includes("error")) {
        console.error("安装出错了o(╥﹏╥)o ... ", module);
        return null;
      }
      return module;
    },
  };
}

/**
 * 从某个目录开始，向上查找pkgJson所在目录
 *
 * @param {string} dir
 * @returns {string}
 */
function tryGetPkgDir(dir: string): string {
  const pkgDir = path.resolve(dir, "./package.json");
  if (fs.existsSync(pkgDir)) {
    return pkgDir;
  }
  const nextDir = path.resolve(dir, "../");
  if (/\/$/.test(nextDir)) {
    console.error("无法找到package.json所在的目录");
    return "";
  }
  return tryGetPkgDir(nextDir);
}
