import React, { useState, useEffect, memo } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Start from "./views/Start";
import Game from "./views/Game";
import Over from "./views/Over";

function App(props) {

  return (
    <>
      <Routes>
        {/* route not found */}
        <Route path="/" element={<Start />} />
        <Route path="game" element={<Game />} />
        <Route path="over" element={<Over />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
