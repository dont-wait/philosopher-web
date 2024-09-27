import { Component } from '@angular/core';
@Component({
  selector: 'app-philosophers',
  templateUrl: './philosophers.component.html',
  styleUrls: ['./philosophers.component.css']
})
export class PhilosophersComponent {
[x: string]: any;
  philosophers = [
    { id: 1, state: 'Thinking' },
    { id: 2, state: 'Thinking' },
    { id: 3, state: 'Thinking' },
    { id: 4, state: 'Thinking' },
    { id: 5, state: 'Thinking' }
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
    this.code = `
    // KHÔNG SỬ DUNG SEMAPHORES
    #include <stdio.h>
    #include <pthread.h>
    #include <unistd.h> 

    #define N 5  


    int spoons[N] = {1, 1, 1, 1, 1};  

    pthread_mutex_t lock;  

    void* philosophers(void* number) {
        int id = *(int*)number; 

        printf("triet gia %d dang nghi...\n", id);
        sleep(1);  

        pthread_mutex_lock(&lock); 
        if (spoons[id] == 1 && spoons[(id + 1) % N] == 1) {
            //  0 (đang được sử dụng).
            spoons[id] = 0;
            spoons[(id + 1) % N] = 0;

            printf("-- --triet gia %d dang an...\n", id);
            sleep(2); 

            // dặt lại thìa khi an xong
            spoons[id] = 1;
            spoons[(id + 1) % N] = 1;
            printf("->triet gia %d da an xong va quay lai nghi...\n", id);
        }

        // Mở khóa mutex để các luồng khác có thể truy cập tài nguyên.
        pthread_mutex_unlock(&lock);
    }

    int main() {
        pthread_t threads[N];  
        int philosophers_ids[N];  

        // Khởi tạo mutex, để đảm bảo đồng bộ trong việc truy cập vào mảng spoons.
        pthread_mutex_init(&lock, NULL);

        // Tạo các luồng
        for (int i = 0; i < N; i++) {
            philosophers_ids[i] = i; 
            pthread_create(&threads[i], NULL, philosophers, &philosophers_ids[i]);
        }

        for (int i = 0; i < N; i++) {
            pthread_join(threads[i], NULL);  // Đợi từng luồng kết thúc trước khi tiến trình chính kết thúc.
        }

        pthread_mutex_destroy(&lock);// giải phóng tài nguyên

        return 0;  
    }
  `
    
    } else if (option === 'Semaphore') {
    this.runSemaphoreAlgorithm();
    const codeContainer = document.getElementById('code-container');
    codeContainer?.classList.toggle('active');
    this.code = `      
        // CÓ SỬ DỤNG SEMAPHORES

        #include <stdio.h>         
        #include <pthread.h>       
        #include <semaphore.h>     
        #include <unistd.h>        

        #define N 5 

        sem_t spoons[N];  // Khai báo mảng semaphores đại diện cho các chiếc thìa 

        void* philosophers(void* number) {  
            int id = *(int*)number;  
            printf("triet gia %d dang nghi...\n", id);  
            sleep(1); 
            
            sem_wait(&spoons[id]); 
            sem_wait(&spoons[(id + 1) % N]);
            printf("-- --triet gia %d dang an...\n", id);  
            sleep(2); 

            // Thả thìa bên trái để triết gia khác có thể sử dụng
            sem_post(&spoons[id]); 
            // Thả thìa bên phải
            sem_post(&spoons[(id + 1) % N]);
            printf("->triet gia %d da an xong va quay lai nghi...\n", id);  
        }

        int main() {
            pthread_t threads[N];  //  mỗi thread đại diện cho một philosophers
            int philosophers_ids[N];  

            for (int i = 0; i < N; i++) {
                sem_init(&spoons[i], 0, 1);  // Khởi tạo từng semaphore với giá trị ban đầu là 1 
            }

            for (int i = 0; i < N; i++) {
                philosophers_ids[i] = i;  
                pthread_create(&threads[i], NULL, philosophers, &philosophers_ids[i]);  
            }

            for (int i = 0; i < N; i++) {
                pthread_join(threads[i], NULL);  // Chờ mỗi thread kết thúc
                // nếu không sử dụng pthread_join thì các luồng có thể kết thúc trước khi hoàn thành nhiệm vụ
            }

          
            for (int i = 0; i < N; i++) {
                sem_destroy(&spoons[i]);  // Hủy semaphore giải phóng tài nguyên
            }

            return 0; 
        }`
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
