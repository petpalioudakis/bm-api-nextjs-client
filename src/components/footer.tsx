export default function Footer() {
  return (
    <footer>
      <div
        className={
          'flex h-16 items-center justify-center bg-black p-2 py-4 text-white'
        }
      >
        <p className={'text-center text-sm'}>
          Copyright © {new Date().getFullYear()}{' '}
          <a href='#' target={'_blank'} referrerPolicy={'no-referrer'}>
            The staff management
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
