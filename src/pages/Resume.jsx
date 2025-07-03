import React from 'react';

const Resume = () => (
  <section className="max-w-2xl mx-auto py-12 px-4 text-center">
    <h1 className="text-3xl font-bold mb-6">Resume</h1>
    <p className="mb-4">Download my resume as a PDF:</p>
    <a
      href="/resume.pdf" // TODO: Place your resume.pdf in the public folder
      download
      className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Download Resume
    </a>
  </section>
);

export default Resume; 