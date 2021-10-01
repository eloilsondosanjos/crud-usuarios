import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: User[] = [
  { id: 1, name: 'Hydrogen', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 2, name: 'Helium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 3, name: 'Lithium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 4, name: 'Beryllium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 5, name: 'Boron', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 6, name: 'Carbon', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 7, name: 'Nitrogen', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 8, name: 'Oxygen', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 9, name: 'Fluorine', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 10, name: 'Neon', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 11, name: 'Sodium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 12, name: 'Magnesium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 13, name: 'Aluminum', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 14, name: 'Silicon', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 15, name: 'Phosphorus', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 16, name: 'Sulfur', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 17, name: 'Chlorine', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 18, name: 'Argon', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 19, name: 'Potassium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
  { id: 20, name: 'Calcium', birthOfDate: new Date("1988-01-11"), wage: 1045 },
];

/**
 * Data source for the UserRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserRead2DataSource extends DataSource<User> {
  data: User[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: User[]): User[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]): User[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(Number(a.id), Number(b.id), isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
