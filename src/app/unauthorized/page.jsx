"use client";
import Link from 'next/link';
import React from 'react';

export default function Unauthorized() {
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-card">
                <h1 className="unauthorized-title">Access Denied</h1>
                <p className="unauthorized-message">
                    You do not have permission to access this page. Please contact your administrator.
                </p>
                <Link href="/users" className="unauthorized-button">
                    Return
                </Link>
            </div>
            <style jsx global>{`
        .unauthorized-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #1a1a1a;
          padding: 20px;
        }
        
        .unauthorized-card {
          background-color: #2d2d2d;
          border-radius: 8px;
          padding: 30px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .unauthorized-title {
          color: #ff4d4d;
          font-size: 28px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .unauthorized-message {
          color: #e0e0e0;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        .unauthorized-button {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .unauthorized-button:hover {
          background-color: #2563eb;
        }
      `}</style>
        </div>
    );
}
