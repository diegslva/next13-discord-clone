const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
      <div className="h-full w-full isolate overflow-hidden bg-gray-900">
        <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="100%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="100%" y={-1} className="overflow-visible fill-gray-800/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
        </svg>
        
        <div className="h-screen flex items-center justify-center">
          
          <div className="mt-24 sm:mt-32 lg:mt-16 px-10">
            
            <div className="flex items-center justify-center">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Gaboo
              </h1>
            </div>
            <div>
              {children}
            </div>
            
          </div>
        
        </div>
      </div>
   );
}
 
export default AuthLayout;