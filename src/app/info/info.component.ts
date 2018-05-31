import { Component } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-info-component',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor() {

  }

  various() {
    swal({
      imageUrl: 'http://www.5z8.info/b00bs_q3n2tb_protocols-of-the-elders-of-zion.doc',
      imageHeight: 749,
      imageWidth: 838,
      imageAlt: 'A tall image'
    });
  }

}
