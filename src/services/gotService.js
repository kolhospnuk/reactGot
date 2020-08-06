
export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    getResource = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async(page) => {
        const res = await this.getResource(`/characters?page=${page}&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    getCharacter = async(id) => {
        const character = await this.getResource(`/characters/${id}`)
        return this._transformCharacter(character);
    }

    getAllHouses = async() => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse)
    }

    getHouse = async(id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    getAllBooks = async() => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBooks);
    }

    getBook = async(id) => {
        const book = await this.getResource(`/characters/${id}`)

        return this.getResource(book);
    }

    checkInfo(char) {
        for (let key in char) {
            if (char[key] === '') {
                char[key] = 'no data';
            }
        }
    }

    _transformCharacter = (char) => {
        this.checkInfo(char);
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overload: house.overload,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBooks = (books) => {
        return {
            name: books.name,
            numberOfPages: books.numberOfPages,
            publisher: books.publisher,
            released: books.released
        }
    }
}