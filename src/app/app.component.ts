import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public listQuotes = [];
  public fromControl: FormControl;
  public toControl: FormControl;
  public amountControl: FormControl;

  constructor(private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.fromControl = new FormControl('', [Validators.required]);
    this.toControl = new FormControl('', [Validators.required]);
    this.amountControl = new FormControl(1, [Validators.required]);
    
    this.apiService.getListQuote().subscribe( data => {
        this.listQuotes = data;
      }
    );
  }

  onCalculateClick() {
    this.apiService.getExhange(this.fromControl.value, this.toControl.value).subscribe(result => {
      console.log("exchange rate: " + result);
      console.log("equivalent value: " + (this.amountControl.value * result));
    });
  }
}
