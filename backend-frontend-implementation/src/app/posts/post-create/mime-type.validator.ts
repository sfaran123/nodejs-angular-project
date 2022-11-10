// import {observable, Observable, Observer} from 'rxjs';
// import {AbstractControl} from '@angular/forms';
//
// export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
//   const file = control.value as File;
//   const fileReader = new FileReader();
//   const frObs = Observable.create((observer: Observer<any>) => {
//     fileReader.addEventListener('loadend', () => {
//         const arr = new Uint8Array(fileReader.result).subarray(0, 4);
//         let header = "";
//         for(let i = 0 ; i < arr.length ; i++) {
//           herader += arr[i].toString(16);
//         }
//     });
//     fileReader.readAsArrayBuffer(file);
//   });
// };
