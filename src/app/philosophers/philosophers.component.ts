import { Component } from '@angular/core';
import { codeSnippets } from '../../assets/code_snippet/code_snippets';
@Component({
  selector: 'app-philosophers',
  templateUrl: './philosophers.component.html',
  styleUrls: ['./philosophers.component.css']
})
export class PhilosophersComponent {
[x: string]: any;
  philosophers = [
    { id: 1, state: 'Thinking', time: '10 seconds', image: '../../assets/images/philosopher1.jpg' },
    { id: 2, state: 'Thinking', time: '10 seconds', image: '../../assets/images/philosopher2.jpg' },
    { id: 3, state: 'Thinking', time: '10 seconds', image: '../../assets/images/philosopher3.jpg' },
    { id: 4, state: 'Thinking', time: '10 seconds', image: '../../assets/images/philosopher4.jpg' },
    { id: 5, state: 'Thinking', time: '10 seconds', image: '../../assets/images/philosopher5.jpg' }
  ];
  isOpen = false;
  selectionOption = '';
  code = '';
  
toggleDropdown() {
  this.isOpen = !this.isOpen;
  }

  removeActive() {
    document.getElementById("code-container")?.classList.toggle("active");
  }

selectOption(option: string) {
  console.log('Option selected:', option);
  this.isOpen = false;
  this.selectionOption = option;

  if (this.selectionOption === 'Classic') {
    this.runClassicAlgorithm();
    const codeContainer = document.getElementById('code-container');
    codeContainer?.classList.toggle('active');
    this.code = codeSnippets.classic; 
    } else if (option === 'Semaphore') {
    this.runSemaphoreAlgorithm();
    const codeContainer = document.getElementById('code-container');
    codeContainer?.classList.toggle('active');
    this.code = codeSnippets.semophore;
  } 
}

runClassicAlgorithm() {
  this.philosophers.forEach((philosopher, index) => {
    //Chỗ này sẽ chạy thuật toán bằng TypeScript
    philosopher.state = index % 2 === 0 ? 'Eating' : 'Thinking';
  });
}

runSemaphoreAlgorithm() {
    //Chỗ này sẽ chạy thuật toán bằng TypeScript
  this.philosophers.forEach((philosopher, index) => {
    philosopher.state = index % 2 === 0 ? 'Thinking' : 'Eating';
  });
}

}
