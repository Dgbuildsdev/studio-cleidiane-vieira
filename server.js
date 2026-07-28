import "dotenv/config";

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

import handler from "./dist/server/assets/server-DwdcutB4.js";


const port = process.env.PORT || 3000;

const clientDir = path.resolve("./dist/client");
const publicDir = path.resolve("./public");



const server = createServer(async (req, res) => {

  try {

    const url = new URL(
      req.url,
      `http://${req.headers.host}`
    );


    /*
    ==================================
    ASSETS DO BUILD (CSS / JS / IMAGENS)
    ==================================
    */

    if (url.pathname.startsWith("/assets/")) {

      const filePath = path.join(
        clientDir,
        url.pathname
      );


      if (existsSync(filePath)) {

        const fileInfo = await stat(filePath);


        if (fileInfo.isFile()) {

          const file = await readFile(filePath);


          if (filePath.endsWith(".css")) {
            res.setHeader(
              "Content-Type",
              "text/css; charset=utf-8"
            );
          }


          if (filePath.endsWith(".js")) {
            res.setHeader(
              "Content-Type",
              "application/javascript; charset=utf-8"
            );
          }


          if (
            filePath.endsWith(".jpg") ||
            filePath.endsWith(".jpeg")
          ) {
            res.setHeader(
              "Content-Type",
              "image/jpeg"
            );
          }


          if (filePath.endsWith(".png")) {
            res.setHeader(
              "Content-Type",
              "image/png"
            );
          }


          res.statusCode = 200;

          res.end(file);

          return;
        }

      }

    }



    /*
    ==================================
    ARQUIVOS PUBLIC
    ==================================
    */


    const publicFile = path.join(
      publicDir,
      url.pathname
    );


    if (existsSync(publicFile)) {


      const fileInfo = await stat(publicFile);


      if (fileInfo.isFile()) {


        const file = await readFile(publicFile);


        res.statusCode = 200;

        res.end(file);


        return;

      }

    }




    /*
    ==================================
    TANSTACK START SSR
    ==================================
    */


    const request = new Request(url, {

      method: req.method,

      headers: req.headers,

    });



    const response = await handler.fetch(request);



    res.statusCode = response.status;



    response.headers.forEach(
      (value, key) => {

        res.setHeader(
          key,
          value
        );

      }
    );



    const body = Buffer.from(
      await response.arrayBuffer()
    );



    res.end(body);



  } catch (error) {


    console.error(
      "\n===== ERRO SSR COMPLETO ====="
    );


    console.error(error);



    res.statusCode = 500;


    res.end(
      "Internal Server Error"
    );


  }

});




server.listen(port, () => {


  console.log(
    `Studio Cleidiane rodando na porta ${port}`
  );


});