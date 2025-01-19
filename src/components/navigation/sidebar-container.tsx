"use server";
import { getSessionPermissionsForRole } from "@/actions/pengguna/session";
import { Permissions } from "@/lib/redis/access-control";
import {
  alurProsesRoutes,
  dashboardRoutes,
  dataReferensiRoutes,
  publicRoutes,
  RouteItem,
} from "@/route";
import { Logger } from "tslog";
import SidebarItems from "./sidebar-items";

const logger = new Logger({
  // hideLogPositionForProduction: true,
  prettyLogTemplate:
    "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{filePathWithLine}}{{name}}]\t",
  prettyLogTimeZone: "UTC",
  prettyErrorStackTemplate:
    "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
  type: "pretty",
  name: "SidebarContainer",
});

// TODO
// Implement route from some settings
const getRoutesReferensiForRoles = async (): Promise<{
  filteredRouteDashboard: RouteItem[];
  filteredRouteReferensi: RouteItem[];
  filteredRoutesAlurProses: RouteItem[];
}> => {
  const permissions: Permissions | null = await getSessionPermissionsForRole();
  if (!permissions) {
    return {
      filteredRouteReferensi: [],
      filteredRoutesAlurProses: [],
      filteredRouteDashboard: [],
    };
  }

  const filteredRouteDashboard = dashboardRoutes.filter((route) => {
    if (route.resources) {
      // Check if any of the route's resources are present in the permissions
      return route.resources.some((resource) => {
        const resourcePermissions = permissions[resource];
        if (!resourcePermissions) return false;

        // Optionally, check specific actions if needed
        return Object.keys(resourcePermissions).length > 0;
      });
    }
    return true; // Include routes without resources by default
  });

  const filteredRouteReferensi = dataReferensiRoutes.filter((route) => {
    if (route.resources) {
      // Check if any of the route's resources are present in the permissions
      return route.resources.some((resource) => {
        const resourcePermissions = permissions[resource];
        if (!resourcePermissions) return false;

        // Optionally, check specific actions if needed
        return Object.keys(resourcePermissions).length > 0;
      });
    }
    return true; // Include routes without resources by default
  });

  const filteredRoutesAlurProses = alurProsesRoutes.filter((route) => {
    if (route.resources) {
      // Check if any of the route's resources are present in the permissions
      return route.resources.some((resource) => {
        const resourcePermissions = permissions[resource];
        if (!resourcePermissions) return false;

        // Optionally, check specific actions if needed
        return Object.keys(resourcePermissions).length > 0;
      });
    }
    return true; // Include routes without resources by default
  });

  return {
    filteredRoutesAlurProses,
    filteredRouteReferensi,
    filteredRouteDashboard,
  };
};

const SidebarContariner = async () => {
  const {
    filteredRouteReferensi,
    filteredRoutesAlurProses,
    filteredRouteDashboard,
  } = await getRoutesReferensiForRoles();
  // logger.info("route dashboard", filteredRouteDashboard);
  // console.log("route referensi", filteredRouteReferensi);
  return (
    <div className="h-full bg-gray-100">
      <div className="h-full overflow-y-auto pb-6">
        <SidebarItems routes={publicRoutes} />
        <SidebarItems routes={filteredRouteDashboard} />
        <SidebarItems
          routes={filteredRoutesAlurProses}
          groupTitle="Alur Proses"
        />
        <SidebarItems
          routes={filteredRouteReferensi}
          groupTitle="Tabel Referensi"
        />
      </div>
    </div>
  );
};

export default SidebarContariner;
