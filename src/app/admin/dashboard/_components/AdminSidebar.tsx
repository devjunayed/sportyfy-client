"use client";

import { currentUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import Button from "@/components/UI/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";

const AdminSidebar = () => {
  const user = useAppSelector(currentUser);
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const role = user?.role || "admin";

  return (
    <aside
      className={`sticky top-24 min-h-[calc(100vh-7rem)] rounded-md bg-[#1B1F3B] p-3 text-white transition-all ${
        collapsed ? "lg:w-20" : "lg:w-72"
      }`}
    >
      <div className="mb-4 flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed((value) => !value)}
          className="text-white hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </Button>
      </div>

      <nav className="space-y-1">
        {adminPaths.map((item) => {
          const href = `/${role}/${item.path}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.path}
              href={href}
              className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
                active
                  ? "bg-white text-[#1B1F3B]"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              title={collapsed ? item.name : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed ? (
                <span className="truncate">{item.name}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
