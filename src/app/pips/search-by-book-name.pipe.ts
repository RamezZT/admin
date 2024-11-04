import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByBookName'
})
export class SearchByBookNamePipe implements PipeTransform {

  transform(value: any[], filterText: string) {
    
    const trimmedFilterText = filterText.trim();

    if (value.length === 0 || trimmedFilterText === '') {
        return value;
    } else {
        return value.filter((book: any) => {
            return book.bookname.toLowerCase().includes(trimmedFilterText.toLowerCase());
        });
    }
}

}
