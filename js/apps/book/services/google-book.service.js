import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"
import { bookService } from "./book.service.js"

export const GoogleBooks = {
    getBookApi,
    getApi,
    addGoogleBook,
}


function getBookApi(book) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${book}`
    return axios.get(url).then(res => res.data)
}

function getApi() {
    return 'https://www.googleapis.com/books/v1/volumes?printType=books&q='
}

function addGoogleBook(book) {
    let books = bookService._loadFromStorage()
    const newBook = {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle
            ? book.volumeInfo.subtitle
            : '',
        authors: book.volumeInfo.authors
            ? book.volumeInfo.authors
            : ['Unknown Author'],
        publishedDate: book.volumeInfo.publishedDate
            ? book.volumeInfo.publishedDate
            : '',
        description: book.volumeInfo.description
            ? book.volumeInfo.description
            : 'No Description',
        pageCount: book.volumeInfo.pageCount
            ? book.volumeInfo.pageCount
            : 'Unknown',
        categories: book.volumeInfo.categories
            ? book.volumeInfo.categories
            : ['Unknown'],
        thumbnail: book.volumeInfo.imageLinks.thumbnail
            ? book.volumeInfo.imageLinks.smallThumbnail
            : '',
        language: book.volumeInfo.language
            ? book.volumeInfo.language
            : 'Unknown',
        listPrice: {
            amount: utilService.getRandomIntInclusive(10, 200),
            currencyCode: 'USD',
            isOnSale: Math.random() > 0.5 ? true : false,
        },
    }
    books.push(newBook)
    bookService._saveToStorage(books)
}

