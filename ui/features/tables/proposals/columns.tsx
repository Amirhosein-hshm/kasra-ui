'use client';

import { useMeStore } from '@/lib/stores/me.stores';
import { UserType } from '@/lib/types/UserType.enum';
import { Button } from '@/ui/components/button';
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
  Check,
  Edit,
  Eye,
  MoreHorizontal,
  Recycle,
  UserPenIcon,
} from 'lucide-react';

interface ColumnOptions {
  onOpenConfirmProposal?: (proposal: ProposalResponse) => void;
  onOpenProposalDetail?: (proposal: ProposalResponse) => void;
  onEditProposal?: (proposal: ProposalResponse) => void;
  onOpenAssignProposal?: (proposal: ProposalResponse) => void;
  onRequestEditProposal?: (proposal: ProposalResponse) => void;
}
const dropdownMenuItemClassname = 'cursor-pointer';

export function getProposalsTableColumns(
  userRoleId: number,
  options?: ColumnOptions
): ColumnDef<ProposalResponse>[] {
  const proposalState = useMeStore((s) => s.user?.proposalState);

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
                <Eye /> مشاهده
              </DropdownMenuItem>

              {userRoleId === 5 &&
                (proposalState?.pendingToAccept as string) ==
                  proposal.state && (
                  <DropdownMenuItem
                    onClick={() => options?.onOpenConfirmProposal?.(proposal)}
                    className={dropdownMenuItemClassname}
                  >
                    <Check /> تایید پروپوزال
                  </DropdownMenuItem>
                )}

              {userRoleId === 2 &&
                (proposalState?.pendingToExplorerAccept as string) ==
                  proposal.state && (
                  <DropdownMenuItem
                    onClick={() => options?.onOpenAssignProposal?.(proposal)}
                    className={dropdownMenuItemClassname}
                  >
                    <UserPenIcon /> تعیین ناظر
                  </DropdownMenuItem>
                )}

              {userRoleId === 3 &&
                ((proposalState?.pendingToFill as string) == proposal.state ||
                  (proposalState?.edit as string) == proposal.state) && (
                  <DropdownMenuItem
                    onClick={() => options?.onEditProposal?.(proposal)}
                    className={dropdownMenuItemClassname}
                  >
                    <Edit color="var(--color-blue-primary)" /> تکمیل پروپوزال
                  </DropdownMenuItem>
                )}

              {userRoleId === UserType.Explorer &&
                row.original.state === 'در انتظار تایید کاشف' && (
                  <DropdownMenuItem
                    onClick={() => options?.onRequestEditProposal?.(proposal)}
                    className={dropdownMenuItemClassname}
                  >
                    <Recycle color="var(--color-indigo-primary)" /> درخواست
                    اصلاح
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
      accessorKey: 'master.name',
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
