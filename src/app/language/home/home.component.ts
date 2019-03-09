import { Component, OnInit, HostBinding,  ChangeDetectorRef  } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from "../../data.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  deviceInfo = null;
  isdevice:string;

  constructor(   
    private deviceService: DeviceDetectorService, 
    private cdRef:ChangeDetectorRef,
    private data: DataService) { }


    @HostBinding('class.mobile')
    public isMobile: Boolean = false; // false is init value
  
    @HostBinding('class.desktop')
    public isDesktop: Boolean = false; // false is init value
  
    @HostBinding('class.tablet')
    public isTablet: Boolean = false; // false is init value
  
    epicFunction(): string  {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
     // const isDesktopDevice = this.deviceService.isDesktop();
     return  isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
    }

    setDevice(device) {
      this.data.changedevice(device)
    }

  ngOnInit() {
    this.epicFunction() === 'mobile' ? this.isMobile = true :  this.epicFunction() === 'tablet' ? this.isTablet = true : this.isDesktop = true; 
    this.data.currentdevice.subscribe(isdevice => this.isdevice = isdevice)
    this.setDevice(this.epicFunction());

  }

}
