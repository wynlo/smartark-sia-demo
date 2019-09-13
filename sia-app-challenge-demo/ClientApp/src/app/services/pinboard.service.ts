import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PinboardService {

  constructor() { }


  public currentBoard = null;
  public pins = null;
  public openPin = null;
  public severityList = ['green','red'];


  public boards = [
    { id: 0 , type: 'Line Check', startdatetime:'18/8/2019 18:00', pins:8 },
    { id: 1 , type: 'A Check', startdatetime:'18/18/2019 18:00', pins:10 },
    { id: 2 , type: 'B Check', startdatetime:'18/18/2019 18:00', pins:7 },
    { id: 3 , type: 'D Check', startdatetime:'18/18/2019 18:00', pins:9 },
    { id: 4 , type: 'Line Check', startdatetime:'18/18/2019 18:00', pins:8 },
    { id: 5 , type: 'Line Check', startdatetime:'18/18/2019 18:00', pins:8 },
  ]



  private pinsByPart = {
      'turbofan' :
      [
        { id: 0 , title: 'Minor Graze' , datetime: '18/8/2019 16:00' , user: 'Wayne', part:'turbofan', component: 'turbine_spool_1',  content: 'Small and poses no threat' , actions: 'none',  items_used: {'a':0,'b':0,'c':0}, severity: 'lime' },
        { id: 1 , title: 'Big Graze' , datetime: '18/8/2019 16:00' , user: 'Timofey', part:'turbofan', component: 'turbine_spool_2',  content: 'Medium sized' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
        { id: 2 , title: 'Dent' , datetime: '18/8/2019 16:00' , user: 'Cheesus', part:'turbofan', component: 'casing',  content: 'Small' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'lime' },
        { id: 3 , title: 'Big Graze' , datetime: '18/8/2019 16:00' , user: 'Jia Sheng', part:'turbofan', component: 'exhaust_valve_1',  content: 'Medium sized' , actions: 'none', items_used: {'a':0,'b':0,'c':0},  severity: 'red' },
      ],
      'landing gear':
      [
        { id: 4 , title: 'Puncture' , datetime: '18/8/2019 16:00' , user: 'Shao Tang', part:'landing gear', component: 'wheel',  content: 'Next guy to fix' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
        { id: 5 , title: 'Puncture' , datetime: '18/8/2019 16:00' , user: 'Nicky P', part:'landing gear', component: 'wheel',  content: 'Still there...' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
        { id: 6 , title: 'Puncture' , datetime: '18/8/2019 16:00' , user: 'Zhishen', part:'landing gear', component: 'wheel',  content: 'Do something' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
      ],
      'wings':
      [
        { id: 7 , title: 'Dent' , datetime: '18/8/2019 16:00' , user: 'Wei Sheng', part:'wings', component: 'wing',  content: 'Very big' , actions: 'none',  items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
      ]
}

private pinsAll = [
  { id: 0 , title: 'Minor Graze' , datetime: '18/8/2019 16:00' , user: 'Wayne', part:'turbofan', component: 'turbine_spool_1',  content: 'Small and poses no threat' , actions: 'none',  items_used: {'a':0,'b':0,'c':0}, severity: 'lime' },
  { id: 1 , title: 'Big Graze' , datetime: '18/8/2019 16:00' , user: 'Timofey', part:'turbofan', component: 'turbine_spool_2',  content: 'Medium sized' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
  { id: 2 , title: 'Dent' , datetime: '18/8/2019 16:00' , user: 'Cheesus', part:'turbofan', component: 'casing',  content: 'Small' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'lime' },
  { id: 3 , title: 'Big Graze' , datetime: '18/8/2019 16:00' , user: 'Jia Sheng', part:'turbofan', component: 'exhaust_valve_1',  content: 'Medium sized' , actions: 'none', items_used: {'a':0,'b':0,'c':0},  severity: 'red' },
  { id: 4 , title: 'Puncture' , datetime: '18/8/2019 16:00' , user: 'Shao Tang', part:'landing gear', component: 'wheel',  content: 'Next guy to fix' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
  { id: 5 , title: 'Puncture' , datetime: '18/8/2019 16:00' , user: 'Nicky P', part:'landing gear', component: 'wheel',  content: 'Still there...' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
  { id: 6 , title: 'Puncture' , datetime: '18/8/2019 16:00' , user: 'Zhishen', part:'landing gear', component: 'wheel',  content: 'Do something' , actions: 'none', items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
  { id: 7 , title: 'Dent' , datetime: '18/8/2019 16:00' , user: 'Wei Sheng', part:'wings', component: 'wing',  content: 'Very big' , actions: 'none',  items_used: {'a':0,'b':0,'c':0}, severity: 'red' },
];

  private filterByPart = 'none';

  GetCurrentBoard() {
    this.currentBoard = this.boards[0];
  }

  GetPinsByPart() {
    this.pins = this.pinsByPart;
  }

  GetPinById(id) {
    this.pinsAll.forEach((pin) => {
      if (pin.id == id) {
        this.openPin = pin;
      }
    })
  }

  GetAllPins() {
    this.pins = this.pinsAll;
  }

}
