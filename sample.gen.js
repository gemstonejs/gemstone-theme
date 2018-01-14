/*
**  GemstoneJS -- Gemstone JavaScript Technology Stack
**  Copyright (c) 2016-2018 Gemstone Project <http://gemstonejs.com>
**  Licensed under Apache License 2.0 <https://spdx.org/licenses/Apache-2.0>
*/

const fs     = require("fs")
const path   = require("path")

const loader = require("../gemstone-loader-css")

let content = fs.readFileSync("./sample.css.in", "utf8")

content = content.replace(/gemstone-theme\.css/, path.resolve(path.join(__dirname, "gemstone-theme.css")))

let ctx = {
    async: () => {
        return (err, res) => {
            if (err)
                console.log(`ERROR: ${err}`)
            else {
                fs.writeFileSync("./sample.css", res, "utf8")
                res = require("./sample.css")
                fs.writeFileSync("./sample.css", res, "utf8")
            }
        }
    },
    cacheable: () => {},
    resourcePath: path.resolve("."),
    resourceDir:  path.resolve("."),
    minimize: false,
    emitError: (err) => {
        console.log(`ERROR: ${err}`)
    }
}

loader.call(ctx, content)

