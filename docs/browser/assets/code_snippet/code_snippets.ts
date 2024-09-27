export const codeSnippets = {
    classic: `// KHÔNG SỬ DUNG SEMAPHORES
    #include <stdio.h>
    #include <pthread.h>
    #include <unistd.h> 

    #define N 5  


    int spoons[N] = {1, 1, 1, 1, 1};  

    pthread_mutex_t lock;  

    void* philosophers(void* number) {
        int id = *(int*)number; 

        printf("triet gia %d dang nghi...\\n", id);
        sleep(1);  

        pthread_mutex_lock(&lock); 
        if (spoons[id] == 1 && spoons[(id + 1) % N] == 1) {
            //  0 (đang được sử dụng).
            spoons[id] = 0;
            spoons[(id + 1) % N] = 0;

            printf("-- --triet gia %d dang an...\\n", id);
            sleep(2); 

            // dặt lại thìa khi an xong
            spoons[id] = 1;
            spoons[(id + 1) % N] = 1;
            printf("->triet gia %d da an xong va quay lai nghi...\\n", id);
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
    }`,
    semophore: `// CÓ SỬ DỤNG SEMAPHORES

        #include <stdio.h>         
        #include <pthread.h>       
        #include <semaphore.h>     
        #include <unistd.h>        

        #define N 5 

        sem_t spoons[N];  // Khai báo mảng semaphores đại diện cho các chiếc thìa 

        void* philosophers(void* number) {  
            int id = *(int*)number;  
            printf("triet gia %d dang nghi...\\n", id);  
            sleep(1); 
            
            sem_wait(&spoons[id]); 
            sem_wait(&spoons[(id + 1) % N]);
            printf("-- --triet gia %d dang an...\\n", id);  
            sleep(2); 

            // Thả thìa bên trái để triết gia khác có thể sử dụng
            sem_post(&spoons[id]); 
            // Thả thìa bên phải
            sem_post(&spoons[(id + 1) % N]);
            printf("->triet gia %d da an xong va quay lai nghi...\\n", id);  
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
        }`,
}