import {Component, OnInit} from '@angular/core';
import {SnackbarsService} from './snack-bar.service';
import {WindowService} from './window.service';
import {Events} from './interfaces';
import {TicketsService} from './tickets.service';
import {Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tickets';
  eventsData: Events;
  eventData: Events[];
  tSub: Subscription;

  constructor(
    private snack: SnackbarsService,
    private window: WindowService,
    private tickets: TicketsService,
    private datePipe: DatePipe
  ) { }

  click() {
    // this.snack.show('Message');
    this.window.show({header: 'Header', description: 'description'});
  }

  ngOnInit(): void {
    this.initTicketService();
    this.eventsData = {
      date: '22.08.2020',
      events: [
        {
          name: {
            en: 'lol',
            ru: 'хорошо',
            etc: ''
          },
          description: {
            en: 'descr',
            ru: 'описание',
            etc: ''
          },
          poster: null,
          NearestSchedule: null
        },
        {name: {
            en: 'lol1',
            ru: 'хорошо1',
            etc: ''
          },
          description: {
            en: 'descr1',
            ru: 'описание1',
            etc: ''
          },
          poster: null,
          NearestSchedule: null},
        {name: {
            en: 'lol2',
            ru: 'хорошо2',
            etc: ''
          },
          description: {
            en: 'descr2',
            ru: 'описание2',
            etc: ''
          },
          poster: null,
          NearestSchedule: null}
      ]
    };


  }

  details(header: string, description: string) {
    this.window.show({header, description});
  }

  initTicketService(): void {
    this.tickets.init();
    const potentialToken = localStorage.getItem('x-auth-token');
    const dt = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (potentialToken) {

      // console.log('got token', potentialToken);
      this.tickets.setToken(potentialToken);

      this.tSub = this.tickets.fetch(dt).subscribe(result => {

        // console.log(result);
        this.eventData = result;
        console.log(this.eventData);

      }, error => {
        console.log('ошибка', error);
      });

    } else {

      console.log('asking for new token');

      this.tickets.init().subscribe(() => {

        this.tSub = this.tickets.fetch(dt).subscribe(result => {

          // console.log(result);
          this.eventData = result;
          console.log(this.eventData);

        }, error => {
          console.log('ошибка', error);
        });
      });
    }
    console.log('asking for new token');

    console.log('token is', this.tickets.getToken());
    console.log('fetching data');

    // this.tSub = this.tickets.fetch(dt).subscribe(result => {
    //   console.log(result);
    // }, error => {
    //   console.log(error);
    // })
  }
}
