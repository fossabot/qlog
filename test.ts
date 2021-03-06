// package main
// import "github.com/quan-to/slog"
import {default as qlog, QLog} from "./src/index";
import LogOperation from './src/LogOperation';

let log = qlog
  .scope("MAIN")
  .addFields({
    hue: "br",
    a: 1,
    stack: "trace",
  });

log.info('a', 'b', 'c');

log.info("Estou no main");
escopo2(log, "doing huebr");
escopo3(log, "doing huebr");
log.debug("HUEBR");

log.io('ABCDE DISK');
log.io('ABCDE DISK1');
log.io('ABCDE DISK2');
log.io('ABCDE DISK3');
log.io('ABCDE DISK4');

function escopo2(log: QLog, argumento0: string) {
  log = log
    .tag('REQUEST1234')
    .subScope("Escopo2")
    .addFields({
      "argumento0": argumento0,
      "abc": {
        "t": 1234,
      },
    });

  log.info("OLOQUINHO MEU");

  log.await("Indo para escopo 3");
  escopo3(log, "do escopo 2");
  log.done("Escopo 3 chamado");
}

function escopo3(log: QLog, argumento2: string) {
  log = qlog.subScope("Escopo3").addFields({
    "argumento2": argumento2,
  });

  log.warn("OLOQUINHO MEU DO ESCOPO 3\nHUEBR\nBRBRBRBR");
  log.error('ERROR MESSAGE');
}
