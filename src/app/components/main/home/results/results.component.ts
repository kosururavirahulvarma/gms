import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  Agency,
  Opportunity,
  OpportunityData,
  OpportunityEs,
} from '../../../../model/Opportunity.model';
import { grantOpportunities } from '../../../../constants/opportunity/opportunity.constants';
import { NavigationHistory } from '../../../../model/HomeNavList';
import { Router, RouterLink } from '@angular/router';
import { NavigationserviceService } from '../../../../services/navigation/navigationservice.service';
import { FormatDatePipe } from '../../../../pipes/format-date.pipe';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ViewmoredialogComponent } from '../dailogs/viewmoredialog/viewmoredialog.component';
import { ToastMessages } from '../../../../constants/Toaster/toaster.messages.constants';
import { SetreminderComponent } from '../dailogs/setreminder/setreminder.component';
import { ViewStateService } from '../../../../services/views/view-state.service';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    JsonPipe,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    FormatDatePipe,
    MatTooltip,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements AfterViewInit, OnInit {
  opportunities: OpportunityEs[] = grantOpportunities;
  opportunitiesList: OpportunityData[] = [];
  dateRangeOpportunitiesList: OpportunityData[] = [];
  agencyOpportunitiesList: OpportunityData[] = [];
  filterOpportunitiesList: OpportunityData[] = [];
  favOpportunities: OpportunityEs[] = [];
  selectedAgency: any = '';
  @Input() screen!: string;
  agencies: Agency[] = [
    { value: 0, viewValue: 'Animal and Plant Health Inspection Service' },
    { value: 1, viewValue: 'National Science Foundation' },
    { value: 2, viewValue: 'Health Resources and Services Administration' },
  ];
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });
  displayedColumns: string[] = [
    'Opportunity',
    'OpportunityTitle',
    'Agency',
    'Deadline',
    'Action',
  ];

  dataSource: MatTableDataSource<OpportunityData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  navigationHistory: NavigationHistory = {
    routeHistory: [],
  };
  constructor(
    private toast: ToastrService,
    private router: Router,
    private navigationserviceService: NavigationserviceService,
    private viewStateService: ViewStateService
  ) {
    this.opportunities.forEach((opportunity) => {
      this.opportunitiesList.push(this.createNewUser(opportunity));
    });
    this.dataSource = new MatTableDataSource(this.opportunitiesList);
  }

  start: any = null;
  end: any = null;
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    const favOpportunities = localStorage.getItem('favOpportunities');
    this.favOpportunities = favOpportunities
      ? JSON.parse(favOpportunities)
      : [];
    console.log(this.screen + '1');
    if (this.screen === 'favorites') {
      this.opportunitiesList = [];
      this.favOpportunities.forEach((opportunity) => {
        this.opportunitiesList.push(this.createNewUser(opportunity));
      });
      this.dataSource.data = this.opportunitiesList;
      this.viewStateService.favDataState$?.subscribe((data) => {
        console.log('constructor sub');
        console.log(data);
        if (data != null) {
          if (data.length != 0) {
            // Ensure data is not null or undefined
            this.dataSource.data = data;
            console.log('constructor if');
          } else {
            console.log('constructor else');
            console.warn(
              'Received null or undefined dataState from ViewStateService.'
            );
            // this.dataSource.data = []; // Optionally reset to an empty array
          }
        }
      });

      this.viewStateService.favFilterState$?.subscribe((filterState) => {
        if (filterState != null) {
          if (filterState.length != 0) {
            console.log('filterState cons');
            console.log(filterState); // Ensure filterState is not null or undefined
            const agency = filterState;
            if (agency != null) {
              console.log(agency);
              if (agency.selectedAgency != null) {
                console.log(agency.selectedAgency);
                this.selectedAgency = agency.selectedAgency;
              }
              if (agency.startDate != null && agency.endDate != null) {
                console.log('start and end date ');
                // const rangeValues = JSON.parse(agency);
                this.start = agency.startDate;
                this.end = agency.endDate;
                console.log(agency);
              }
            }
          } else {
            console.warn(
              'Received null or undefined filterState from ViewStateService.'
            );
            // this.selectedAgency = '';
            // this.range.reset({ start: null, end: null }); // Reset to default state
          }
        }
      });
    }
    this.navigationserviceService.history$.subscribe((history) => {
      console.log(history);
      // this.history = history;
      this.navigationHistory = history;
      console.log('history component');
      console.log(history);
    });
    this.range.controls['end'].valueChanges.subscribe((value) => {
      this.applyFilters();
    });

    console.log('constructor called');
    console.log(this.screen);
    // Subscribe to the ViewStateService for any updates
    if (this.screen === 'opportunity') {
      this.viewStateService.dataState$?.subscribe((data) => {
        console.log('constructor sub');
        console.log(data);
        if (data != null) {
          if (data.length != 0) {
            // Ensure data is not null or undefined
            this.dataSource.data = data;
            console.log('constructor if');
          } else {
            console.log('constructor else');
            console.warn(
              'Received null or undefined dataState from ViewStateService.'
            );
            // this.dataSource.data = []; // Optionally reset to an empty array
          }
        }
      });

      this.viewStateService.filterState$?.subscribe((filterState) => {
        if (filterState != null) {
          if (filterState.length != 0) {
            console.log('filterState cons');
            console.log(filterState); // Ensure filterState is not null or undefined
            const agency = filterState;
            if (agency != null) {
              console.log(agency);
              if (agency.selectedAgency != null) {
                console.log(agency.selectedAgency);
                this.selectedAgency = agency.selectedAgency;
              }
              if (agency.startDate != null && agency.endDate != null) {
                console.log('start and end date ');
                // const rangeValues = JSON.parse(agency);
                this.start = agency.startDate;
                this.end = agency.endDate;
                console.log(agency);
              }
            }
          } else {
            console.warn(
              'Received null or undefined filterState from ViewStateService.'
            );
            // this.selectedAgency = '';
            // this.range.reset({ start: null, end: null }); // Reset to default state
          }
        }
      });
    }
    if (this.start != null && this.end != null)
      this.range.patchValue({
        start: this.start,
        end: this.end,
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  createNewUser(opportunity: OpportunityEs): OpportunityData {
    if (this.screen === 'favorites') {
      return {
        Opportunity: opportunity._source.opportunity_number,
        OpportunityTitle: opportunity._source.opportunity_title,
        Agency: opportunity._source.agency_name,
        Deadline: opportunity._source.close_date,
        Action: { view: false, favorite: true, remainder: false },
      };
    } else {
      return {
        Opportunity: opportunity._source.opportunity_number,
        OpportunityTitle: opportunity._source.opportunity_title,
        Agency: opportunity._source.agency_name,
        Deadline: opportunity._source.close_date,
        Action: { view: false, favorite: false, remainder: false },
      };
    }
  }

  // //Agent filter
  // onAgencySelect(): void {
  //   console.log('Selected Agency:', this.selectedAgency);
  //   this.filterOpportunitiesList = this.opportunitiesList.filter(
  //     (opportunity) =>
  //       opportunity.Agency === this.agencies[this.selectedAgency].viewValue
  //   );
  //   console.log('Selected Agency:', this.filterOpportunitiesList);
  //   this.dataSource.data = this.filterOpportunitiesList;
  // }

  // //date filter
  // filterByDate(): void {
  //   const startDate = this.range.controls['start'].value;
  //   const endDate = this.range.controls['end'].value;

  //   if (startDate && endDate) {
  //     // Ensure that start and end are valid Date objects
  //     const parsedStartDate = new Date(startDate);
  //     const parsedEndDate = new Date(endDate);
  //     console.log(parsedStartDate);
  //     console.log(parsedEndDate);
  //     // Check if parsedStartDate and parsedEndDate are valid
  //     if (
  //       !isNaN(parsedStartDate.getTime()) &&
  //       !isNaN(parsedEndDate.getTime())
  //     ) {
  //       this.dataSource.data = this.opportunitiesList.filter((opportunity) => {
  //         // Convert the opportunity.Deadline string (MMDDYYYY) to a Date object
  //         const opportunityDeadline = this.convertStringToDate(
  //           opportunity.Deadline
  //         );
  //         console.log(opportunityDeadline);
  //         // Ensure that opportunityDeadline is a valid Date
  //         if (isNaN(opportunityDeadline.getTime())) {
  //           return false; // If the opportunity's Deadline is not a valid date, skip it
  //         }

  //         // Now filter the opportunities based on the date range
  //         return (
  //           opportunityDeadline >= parsedStartDate &&
  //           opportunityDeadline <= parsedEndDate
  //         );
  //       });
  //     }
  //   }
  // }
  applyFilters(): void {
    console.log('apply filters called');
    const startDate = this.range.controls['start'].value;
    const endDate = this.range.controls['end'].value;
    const selectedAgency = this.selectedAgency;
    console.log(selectedAgency);
    console.log(startDate);
    console.log(endDate);

    // Convert the selected agency view value to the agency name
    const agencyName = this.agencies[this.selectedAgency]?.viewValue;

    let filteredList = [...this.opportunitiesList]; // Start with the full list

    // Apply the agency filter if an agency is selected
    if (selectedAgency >= 0 && agencyName) {
      console.log('Agency Filter Applied: ', agencyName);
      filteredList = filteredList.filter(
        (opportunity) => opportunity.Agency === agencyName
      );
      console.log('Filtered by Agency: ', filteredList);
    }

    // Apply the date filter if both start and end dates are selected
    if (startDate && endDate) {
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);

      if (
        !isNaN(parsedStartDate.getTime()) &&
        !isNaN(parsedEndDate.getTime())
      ) {
        console.log('Date Filter Applied: ', parsedStartDate, parsedEndDate);

        filteredList = filteredList.filter((opportunity) => {
          const opportunityDeadline = this.convertStringToDate(
            opportunity.Deadline
          );
          console.log('Opportunity Deadline: ', opportunityDeadline);

          if (isNaN(opportunityDeadline.getTime())) {
            return false; // Skip invalid deadlines
          }

          // Apply the date filter
          return (
            opportunityDeadline >= parsedStartDate &&
            opportunityDeadline <= parsedEndDate
          );
        });
        console.log('Filtered by Date: ', filteredList);
      }
    }

    // Apply both filters together if both are selected
    if (selectedAgency && startDate && endDate) {
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
      filteredList = filteredList.filter((opportunity) => {
        const opportunityDeadline = this.convertStringToDate(
          opportunity.Deadline
        );
        return (
          opportunity.Agency === agencyName &&
          opportunityDeadline >= parsedStartDate &&
          opportunityDeadline <= parsedEndDate
        );
      });
      console.log('Both Agency and Date Filters Applied');
    }
    if (this.screen === 'opportunity') {
      this.viewStateService.updateFilterState({
        selectedAgency,
        startDate,
        endDate,
      });
      this.viewStateService.updateDataState(filteredList);
    }
    if (this.screen === 'favorites') {
      this.viewStateService.updateFavFilterState({
        selectedAgency,
        startDate,
        endDate,
      });
      this.viewStateService.updateFavDataState(filteredList);
    }
    // Update the data source with the final filtered list
    this.dataSource.data = filteredList;
  }

  // Function to convert MMDDYYYY string (e.g., 01212025) to Date object
  convertStringToDate(dateString: string): Date {
    const month = parseInt(dateString.substring(0, 2), 10) - 1; // Months are 0-based in JS
    const day = parseInt(dateString.substring(2, 4), 10);
    const year = parseInt(dateString.substring(4, 8), 10);

    return new Date(year, month, day);
  }
  refresh() {
    this.selectedAgency = '';
    this.range.reset({
      start: null,
      end: null,
    });
    this.dataSource.data = this.opportunitiesList;
  }
  view(row: OpportunityData) {
    // const element = this.opportunities.find((element) => {
    //   console.log(element._source.opportunity_number);
    //   console.log(row.Opportunity);
    //   return element._source.opportunity_number === row.Opportunity;
    // });
    // this.dialog.open(ViewmoredialogComponent, {
    //   data: element?._source,
    //   height: '400px',
    //   width: '1000px',
    // });
    if (
      this.navigationHistory?.routeHistory?.[
        this.navigationHistory.routeHistory.length - 1
      ]?.routeName === 'opportunity'
    ) {
      this.router.navigate(['home/opportunity', row.Opportunity]);
    } else if (
      this.navigationHistory?.routeHistory?.[
        this.navigationHistory.routeHistory.length - 1
      ]?.routeName === 'favorites'
    ) {
      this.router.navigate(['home/favorites', row.Opportunity]);
    }
  }
  addToFav(row: OpportunityData) {
    console.log(row);
    row.Action.favorite = true;
    console.log(row.Action.favorite);
    const message = 'Opportunity Added To Favorites';
    const type = 'info';
    this.opportunities.forEach((element) => {
      if (element._source.opportunity_number === row.Opportunity) {
        this.favOpportunities.push(element);
      }
    });
    console.log(this.favOpportunities);
    localStorage.setItem(
      'favOpportunities',
      JSON.stringify(this.favOpportunities)
    );
    this.callToaster(ToastMessages.ADD_TO_FAV, type);
  }
  removeFromFav(row: OpportunityData) {
    row.Action.favorite = false;
    const type = 'error';
    this.callToaster(ToastMessages.REmove_from_FAV, type);
    this.favOpportunities = this.favOpportunities.filter(
      (fav) => fav._source.opportunity_number !== row.Opportunity
    );
    localStorage.setItem(
      'favOpportunities',
      JSON.stringify(this.favOpportunities)
    );
    if (this.screen === 'favorites') {
      this.opportunitiesList = this.opportunitiesList.filter(
        (fav) => fav.Opportunity !== row.Opportunity
      );
      this.dataSource.data = this.opportunitiesList;
    }
  }
  setRemainder(row: OpportunityData) {
    const element = this.opportunities.find((element) => {
      console.log(element._source.opportunity_number);
      console.log(row.Opportunity);
      return element._source.opportunity_number === row.Opportunity;
    });
    const response = this.dialog.open(SetreminderComponent, {
      data: element?._source,
      height: '400px',
      width: '1000px',
    });

    response.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result); // response can be timestamp or undefined
      if (result != null || result != undefined) {
        row.Action.remainder = true;
        const type = 'info';
        this.callToaster(ToastMessages.ADD_TO_REMAINDER, type);
      }
    });
  }
  clearRemainder(row: OpportunityData) {
    row.Action.remainder = false;
    const type = 'error';
    this.callToaster(ToastMessages.REMOVE_FROM_REMAINDER, type);
  }

  callToaster(message: string, type: string) {
    this.toast.clear();
    if (type == 'info') {
      this.toast.info(message, '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    } else if (type == 'error') {
      this.toast.error(message, '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }
}
