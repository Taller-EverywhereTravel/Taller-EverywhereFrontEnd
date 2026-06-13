import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SidebarComponent, SidebarMenuItem } from '../../shared/components/sidebar/sidebar.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { DataTableConfig } from '../../shared/components/data-table/data-table.config';

import { MenuConfigService, ExtendedSidebarMenuItem } from '../../core/service/menu/menu-config.service';
import { AccountingEntryService } from '../../core/service/accounting/AccountingEntry.service';

import {
  AccountingEntryResponse
} from '../../shared/models/Accounting/accounting-entry.model';

export interface AccountingEntryTabla {
  id: number;
  entryNumber?: string;
  entryDate?: string;
  liquidationId?: number;
  documentType?: string;
  documentNumber?: string;
  totalDebit?: number;
  totalCredit?: number;
  status?: string;
}

@Component({
  selector: 'app-accounting',
  standalone: true,
  templateUrl: './accounting.html',
  styleUrls: ['./accounting.css'],
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    DataTableComponent
  ]
})
export class Accounting implements OnInit {

  private router = inject(Router);
  private accountingEntryService = inject(AccountingEntryService);

  sidebarCollapsed = false;
  sidebarMenuItems: ExtendedSidebarMenuItem[] = [];

  isLoading = false;
  isGenerating = false;

  accountingEntries: AccountingEntryResponse[] = [];
  accountingEntriesTabla: AccountingEntryTabla[] = [];

  selectedEntry: AccountingEntryResponse | null = null;

  mostrarModalGenerar = false;
  mostrarModalVer = false;

  liquidationIdToGenerate: number | null = null;

  errorMessage = '';
  successMessage = '';
  showErrorMessage = false;
  showSuccessMessage = false;

  tableConfig: DataTableConfig<AccountingEntryTabla> = {
    data: [],
    columns: [
      {
        key: 'entryNumber',
        header: 'N° Asiento',
        icon: 'fa-hashtag',
        sortable: true,
        width: '150px',
        render: (item) => item.entryNumber || 'N/A'
      },
      {
        key: 'entryDate',
        header: 'Fecha',
        icon: 'fa-calendar-alt',
        sortable: true,
        width: '130px',
        render: (item) => this.formatDate(item.entryDate)
      },
      {
        key: 'liquidationId',
        header: 'Liquidación',
        icon: 'fa-file-invoice',
        sortable: true,
        width: '130px',
        render: (item) => item.liquidationId ? item.liquidationId.toString() : 'N/A'
      },
      {
        key: 'documentNumber',
        header: 'Documento',
        icon: 'fa-file-alt',
        sortable: true,
        width: '180px',
        render: (item) => {
          const type = item.documentType || '';
          const number = item.documentNumber || '';
          return `${type} ${number}`.trim() || 'N/A';
        }
      },
      {
        key: 'totalDebit',
        header: 'Debe',
        icon: 'fa-arrow-down',
        sortable: true,
        width: '130px',
        render: (item) => this.formatCurrency(item.totalDebit)
      },
      {
        key: 'totalCredit',
        header: 'Haber',
        icon: 'fa-arrow-up',
        sortable: true,
        width: '130px',
        render: (item) => this.formatCurrency(item.totalCredit)
      },
      {
        key: 'status',
        header: 'Estado',
        icon: 'fa-check-circle',
        sortable: true,
        width: '120px',
        render: (item) => item.status || 'DRAFT'
      }
    ],
    enableSearch: true,
    searchPlaceholder: 'Buscar por asiento, liquidación, documento o estado...',
    enableSelection: true,
    enablePagination: true,
    enableViewSwitcher: true,
    enableSorting: true,
    itemsPerPage: 10,
    pageSizeOptions: [5, 10, 25, 50],
    actions: [
      {
        icon: 'fa-eye',
        label: 'Ver',
        color: 'green',
        handler: (item) => this.verDetalle(this.getAccountingEntryById(item.id)!)
      },
      {
        icon: 'fa-trash',
        label: 'Eliminar',
        color: 'red',
        handler: (item) => this.eliminarAsiento(item.id)
      }
    ],
    emptyMessage: 'No se encontraron asientos contables',
    loadingMessage: 'Cargando asientos contables...',
    defaultView: 'table',
    enableRowHover: true,
    trackByKey: 'id'
  };

  constructor(private menuConfigService: MenuConfigService) { }

  ngOnInit(): void {
    this.sidebarMenuItems = this.menuConfigService.getMenuItems('/accounting');
    this.loadAccountingEntries();
  }

  onToggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onSidebarItemClick(item: SidebarMenuItem): void {
    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }

  loadAccountingEntries(): void {
    this.isLoading = true;

    this.accountingEntryService.findAll().subscribe({
      next: (data) => {
        this.accountingEntries = data || [];
        this.accountingEntriesTabla = this.convertToAccountingEntryTabla(this.accountingEntries);

        this.tableConfig = {
          ...this.tableConfig,
          data: this.accountingEntriesTabla
        };

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar asientos contables:', error);
        this.showError('Error al cargar los asientos contables.');
        this.accountingEntries = [];
        this.accountingEntriesTabla = [];
        this.tableConfig = {
          ...this.tableConfig,
          data: []
        };
        this.isLoading = false;
      }
    });
  }

  private convertToAccountingEntryTabla(entries: AccountingEntryResponse[]): AccountingEntryTabla[] {
    return entries.map(entry => ({
      id: entry.id,
      entryNumber: entry.entryNumber,
      entryDate: entry.entryDate,
      liquidationId: entry.liquidationId,
      documentType: entry.documentType,
      documentNumber: entry.documentNumber,
      totalDebit: entry.totalDebit,
      totalCredit: entry.totalCredit,
      status: entry.status
    }));
  }

  getAccountingEntryById(id: number): AccountingEntryResponse | undefined {
    return this.accountingEntries.find(entry => entry.id === id);
  }

  abrirModalGenerar(): void {
    this.liquidationIdToGenerate = null;
    this.mostrarModalGenerar = true;
  }

  cerrarModalGenerar(): void {
    this.mostrarModalGenerar = false;
    this.liquidationIdToGenerate = null;
  }

  generateFromLiquidation(): void {
    if (!this.liquidationIdToGenerate) {
      this.showError('Ingrese el ID de la liquidación.');
      return;
    }

    this.isGenerating = true;
    this.isLoading = true;

    this.accountingEntryService.generateFromLiquidation(this.liquidationIdToGenerate).subscribe({
      next: () => {
        this.showSuccess('Asiento contable generado correctamente.');
        this.cerrarModalGenerar();
        this.loadAccountingEntries();
        this.isGenerating = false;
      },
      error: (error) => {
        console.error('Error al generar asiento contable:', error);
        this.showError('No se pudo generar el asiento contable desde la liquidación.');
        this.isGenerating = false;
        this.isLoading = false;
      }
    });
  }

  verDetalle(entry: AccountingEntryResponse | undefined): void {
    if (!entry) {
      this.showError('No se encontró el asiento contable.');
      return;
    }

    if (entry.id) {
      this.isLoading = true;

      this.accountingEntryService.findById(entry.id).subscribe({
        next: (data) => {
          this.selectedEntry = data;
          this.mostrarModalVer = true;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar detalle del asiento:', error);
          this.showError('Error al cargar el detalle del asiento contable.');
          this.isLoading = false;
        }
      });
    }
  }

  cerrarModalVer(): void {
    this.mostrarModalVer = false;
    this.selectedEntry = null;
  }

  eliminarAsiento(id: number): void {
    const confirmar = confirm('¿Está seguro de eliminar este asiento contable?');

    if (!confirmar) {
      return;
    }

    this.isLoading = true;

    this.accountingEntryService.delete(id).subscribe({
      next: () => {
        this.showSuccess('Asiento contable eliminado correctamente.');
        this.loadAccountingEntries();
      },
      error: (error) => {
        console.error('Error al eliminar asiento contable:', error);
        this.showError('No se pudo eliminar el asiento contable.');
        this.isLoading = false;
      }
    });
  }

  getTotalAccountingEntries(): number {
    return this.accountingEntries.length;
  }

  getPostedCount(): number {
    return this.accountingEntries.filter(entry => entry.status === 'POSTED').length;
  }

  getDraftCount(): number {
    return this.accountingEntries.filter(entry => !entry.status || entry.status === 'DRAFT').length;
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return 'N/A';
    }

    const dateOnly = dateString.split('T')[0];
    const [year, month, day] = dateOnly.split('-');

    if (!year || !month || !day) {
      return dateString;
    }

    return `${day}/${month}/${year}`;
  }

  formatCurrency(value: number | undefined): string {
    const amount = value || 0;

    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorMessage = true;
    this.showSuccessMessage = false;

    setTimeout(() => {
      this.showErrorMessage = false;
    }, 5000);
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    this.showErrorMessage = false;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  hideMessages(): void {
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
  }
}
