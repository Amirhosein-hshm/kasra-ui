'use client';

import { ProposalResponse } from 'lib/types/proposalResponse';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';
import { Button } from '@/ui/components/button';
import {
  ArrowUpDown,
  Edit,
  Eye,
  MoreHorizontal,
  Trash,
  FileText,
} from 'lucide-react';

interface ColumnOptions {
  onOpenCommission?: (proposal: ProposalResponse) => void;
  onOpenProposalDetail?: (proposal: ProposalResponse) => void;
  onEditProposal?: (proposal: ProposalResponse) => void;
}
const dropdownMenuItemClassname = 'justify-end cursor-pointer';

export function getProposalsTableColumns(
  userRoleId: number,
  options?: ColumnOptions
): ColumnDef<ProposalResponse>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="انتخاب همه"
          className="m-3"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="انتخاب"
          className="m-3"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const proposal = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">باز کردن فهرست</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                فعالیت ها
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => options?.onOpenProposalDetail?.(proposal)}
                className={dropdownMenuItemClassname}
              >
                مشاهده <Eye color="var(--color-stone-primary)" />
              </DropdownMenuItem>

              {userRoleId === 1 && (
                <DropdownMenuItem
                  onClick={() => options?.onOpenCommission?.(proposal)}
                  className={dropdownMenuItemClassname}
                >
                  کمیسیون <FileText color="var(--color-stone-primary)" />
                </DropdownMenuItem>
              )}

              {userRoleId === 4 && (
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(proposal.id.toString())
                  }
                  className={dropdownMenuItemClassname}
                >
                  حذف <Trash color="var(--color-red-primary)" />
                </DropdownMenuItem>
              )}

              {(userRoleId === 4 || userRoleId === 3) && (
                <DropdownMenuItem
                  onClick={() => options?.onEditProposal?.(proposal)}
                  className={dropdownMenuItemClassname}
                >
                  ویرایش <Edit color="var(--color-blue-primary)" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          شناسه
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    ...getProposalTableFiles(userRoleId),
  ];
}

const getProposalTableFiles = (userRoleId: number) => {
  const proposalsTableFields = [
    {
      accessorKey: 'info',
      header: 'عنوان',
    },
    {
      accessorKey: 'rfpId',
      header: 'شناسه RFP',
    },
    {
      accessorKey: 'comment',
      header: 'توضیحات',
    },
    {
      accessorKey: 'state',
      header: 'وضعیت',
    },

    {
      accessorKey: 'rfp.info',
      header: 'عنوان RFP',
    },
    {
      accessorKey: 'rfp.rfpField.title',
      header: 'دسته بندی',
    },
  ];
  if (userRoleId === 1) {
    const fields = ['info', 'rfp.info', 'rfp.rfpField.title'];
    return proposalsTableFields.filter((field) =>
      fields.includes(field.accessorKey)
    );
  }
  if (userRoleId === 4) {
    const fields = ['info', 'rfp.info', 'rfp.rfpField.title'];
    return proposalsTableFields.filter((field) =>
      fields.includes(field.accessorKey)
    );
  }
  if (userRoleId === 3) {
    const fields = ['info', 'rfp.info', 'rfp.rfpField.title'];
    return proposalsTableFields.filter((field) =>
      fields.includes(field.accessorKey)
    );
  }

  return proposalsTableFields;
};
