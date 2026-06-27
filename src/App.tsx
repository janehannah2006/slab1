import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OverviewView from './components/OverviewView';
import TranslatorView from './components/TranslatorView';
import GeneratorView from './components/GeneratorView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverviewView />} />
          <Route path="translator" element={<TranslatorView />} />
          <Route path="generator" element={<GeneratorView />} />
          <Route path="*" element={<OverviewView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
