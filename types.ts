// Fix: Import React to resolve 'Cannot find namespace React' when using React.ReactNode
import React from 'react';

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  timerHint?: string;
}

export enum DiagnosticLayer {
  Static = 'STATIC',
  Dynamic = 'DYNAMIC',
  Full = 'FULL'
}