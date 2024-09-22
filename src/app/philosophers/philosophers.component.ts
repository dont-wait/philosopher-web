import { Component } from '@angular/core';

@Component({
  selector: 'app-philosophers',
  templateUrl: './philosophers.component.html',
  styleUrls: ['./philosophers.component.css']
})
export class PhilosophersComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    if (option === 'Cổ điển') {
      this.basic();
    } else if (option === 'Semophore') {
      this.usingSemophore();
    }
    this.isOpen = false; // Đóng dropdown sau khi chọn
  }

  basic() {
    console.log('Hello');
  }

  usingSemophore() {
    for (let i = 1; i <= 10; i++) {
      console.log(i);
    }
  }
}
