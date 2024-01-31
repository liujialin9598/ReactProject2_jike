import { request } from "@/utils";
import React, { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    request.get("/user/profile");
  });

  return <div>layout</div>;
}
