import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class DataCollectorService {

    collection: BehaviorSubject<any>;
    books = [];
    myRequiredBooks = [];
    myDonatedBooks = [];
    constructor() {
        this.collection = new BehaviorSubject<any>('data');
        this.getAllBooks();
    }

    getAllBooks() {
        firebase.database().ref('books').on('value', snapshot => {
            this.books = [];
            snapshot.forEach((node) => {
                const book = node.val();
                book.show = false;
                this.books.push(book);
                this.setValue('data');
            });
        });
    }

    setValue(value) {
        return this.collection.next(value);
    }

    getValue(): Observable<boolean> {
        return this.collection.asObservable();
    }

    getUserBooks(uid) {
        const ref = 'books-' + uid;
        firebase.database().ref(`${ref}`).on('value', snapshot => {
            this.myRequiredBooks = [];
            this.myDonatedBooks = [];
            snapshot.forEach((node) => {
                const book = node.val();
                book.show = false;
                if (book.purpose === 'Donation') {
                    this.myDonatedBooks.push(book);
                } else {
                    this.myRequiredBooks.push(book);
                }
            });
            this.setValue('books');
        });
    }
}
