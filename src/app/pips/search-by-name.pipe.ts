import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(value: any[], filterText: string) {
    
    const trimmedFilterText = filterText.trim();

    if (value.length === 0 || trimmedFilterText === '') {
        return value;
    } else {
        return value.filter((library: any) => {
            return library.name.toLowerCase().includes(trimmedFilterText.toLowerCase());
        });
    }
}


}
