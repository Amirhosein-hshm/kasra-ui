'use client';

import { Button } from '@/ui/components/button';
import { Checkbox } from '@/ui/components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ProposalResponse } from 'lib/types/proposalResponse';
import {
  ArrowUpDown,
  Check,
  Edit,
  Eye,
  MoreHorizontal,
  UserPenIcon,
} from 'lucide-react';

interface ColumnOptions {
  onOpenConfirmProposal?: (proposal: ProposalResponse) => void;
  onOpenProposalDetail?: (proposal: ProposalResponse) => void;
  onEditProposal?: (proposal: ProposalResponse) => void;
  onOpenAssignProposal?: (proposal: ProposalResponse) => void;
}
const dropdownMenuItemClassname = 'justify-end cursor-pointer';

export function getProposalsTableColumns(
  userRoleId: number,
  options?: ColumnOptions
): ColumnDef<ProposalResponse>[] {
  return [
    ...getProposalTableFiles(userRoleId),
    {
      id: 'actions',
      header: 'عملیات',
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

              {userRoleId === 5 && (
                <DropdownMenuItem
                  onClick={() => options?.onOpenConfirmProposal?.(proposal)}
                  className={dropdownMenuItemClassname}
                >
                  تایید پروپوزال <Check color="var(--color-green-primary)" />
                </DropdownMenuItem>
              )}

              {/* {userRoleId === 4 && (
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(proposal.id.toString())
                  }
                  className={dropdownMenuItemClassname}
                >
                  حذف <Trash color="var(--color-red-primary)" />
                </DropdownMenuItem>
              )} */}

              {userRoleId === 2 && (
                <DropdownMenuItem
                  onClick={() => options?.onOpenAssignProposal?.(proposal)}
                  className={dropdownMenuItemClassname}
                >
                  تعیین ناظر <UserPenIcon color="var(--color-blue-primary)" />
                </DropdownMenuItem>
              )}

              {(userRoleId === 4 || userRoleId === 3) && (
                <DropdownMenuItem
                  onClick={() => options?.onEditProposal?.(proposal)}
                  className={dropdownMenuItemClassname}
                >
                  تکمیل پروپوزال <Edit color="var(--color-blue-primary)" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

const getProposalTableFiles = (userRoleId: number) => {
  const proposalsTableFields = [
    {
      accessorKey: 'title',
      header: 'عنوان',
    },
    {
      accessorKey: 'masterNameAndFamily',
      header: 'استاد راهنما',
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
    const fields = ['title', 'state', 'masterNameAndFamily'];
    return proposalsTableFields.filter((field) =>
      fields.includes(field.accessorKey)
    );
  }

  return proposalsTableFields;
};
