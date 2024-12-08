'use client';
import Link from 'next/link';

export function otherLink() {
  return (
    <Link
      href="/home"
      onClick={(e) => {
        e.preventDefault(); // Prevent the default link behavior
        window.open('https://anotherlink', '_blank'); // Open the second link in a new tab
        window.location.href = '/home'; // Navigate to the original link
      }}>
      Watch Now
    </Link>
  );
}
