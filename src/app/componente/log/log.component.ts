import { LogService } from './../../Service/log.service';
import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/Models/Log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs : Log[];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.ListarLogs();
  }

  ListarLogs(): void {
    this.logService.ListarLogs().subscribe((resultado) => {
      this.logs = resultado;
    });
  }

}
