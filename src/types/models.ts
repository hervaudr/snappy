// types/models.ts
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
    storeId: string;
  }
  
  export interface Store {
    id: string;
    name: string;
    address: string;
    managerId: string;
  }
  
  export interface Employee {
    id: string;
    userId: string;
    storeId: string;
    position: string;
    contractHours: number;
    availabilities: Availability[];
  }
  
  export interface Schedule {
    id: string;
    storeId: string;
    weekNumber: number;
    year: number;
    shifts: Shift[];
  }
  
  export interface Shift {
    id: string;
    employeeId: string;
    scheduleId: string;
    startTime: Date;
    endTime: Date;
    position: string;
  }
  
  export interface Availability {
    id: string;
    employeeId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }
  
  // lib/auth/permissions.ts
  export const Permissions = {
    MANAGE_STORE: 'manage:store',
    MANAGE_EMPLOYEES: 'manage:employees',
    MANAGE_SCHEDULE: 'manage:schedule',
    VIEW_SCHEDULE: 'view:schedule',
    EDIT_AVAILABILITY: 'edit:availability',
  } as const;
  
  export const RolePermissions = {
    ADMIN: [
      Permissions.MANAGE_STORE,
      Permissions.MANAGE_EMPLOYEES,
      Permissions.MANAGE_SCHEDULE,
      Permissions.VIEW_SCHEDULE,
      Permissions.EDIT_AVAILABILITY,
    ],
    MANAGER: [
      Permissions.MANAGE_EMPLOYEES,
      Permissions.MANAGE_SCHEDULE,
      Permissions.VIEW_SCHEDULE,
      Permissions.EDIT_AVAILABILITY,
    ],
    EMPLOYEE: [
      Permissions.VIEW_SCHEDULE,
      Permissions.EDIT_AVAILABILITY,
    ],
  } as const;
  
  // lib/auth/hooks/usePermissions.ts
//   import { useSession } from 'next-auth/react';
  
//   export function usePermissions() {
//     const { data: session } = useSession();
//     const userRole = session?.user?.role;
  
//     const hasPermission = (permission: keyof typeof Permissions) => {
//       if (!userRole) return false;
//       return RolePermissions[userRole].includes(permission);
//     };
  
//     return { hasPermission };
//   }
  
  // components/PermissionGate.tsx
//   import { ReactNode } from 'react';
//   import { usePermissions } from '@/lib/auth/hooks/usePermissions';
  
//   interface Props {
//     permission: keyof typeof Permissions;
//     children: ReactNode;
//   }
  
//   export function PermissionGate({ permission, children }: Props) {
//     const { hasPermission } = usePermissions();
    
//     if (!hasPermission(permission)) return null;
    
//     return <>{children}</>;
//   }