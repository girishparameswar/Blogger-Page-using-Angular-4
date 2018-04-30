import {Pipe} from '@angular/core';
//import Moment from 'moment';

@Pipe({
    name: 'timePipe'
})

export class TimePipe {

    transform(value) {
        if(value && (value instanceof Date || 
        typeof value === 'number')) {
            //return new Moment(value).timePipe();
        }
    }
}