import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  openLinkedIn() {
  
    window.open('https://www.https://www.linkedin.com/in/sang-nguyen-tan-279a9930b/.com', '_blank');
  }

  openFacebook() {
    window.open('https://www.https://www.facebook.com/San6.NT.com', '_blank');
  }

  openGitHub() {
    window.open('https://www.https://www.linkedin.com/in/sang-nguyen-tan-279a9930b/.com', '_blank');
  }

  openZalo() {
    window.open('https://zalo.me', '_blank'); // Replace with the correct URL if different
  }
}
