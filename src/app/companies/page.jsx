"use client";
import RoleGuard from '@/components/guards/roleGuard';

export default function Company() {
    return (
        <RoleGuard allowedRoles={["admin"]}>
            <h1>Company Dashboard</h1>
        </RoleGuard>
    );
}
