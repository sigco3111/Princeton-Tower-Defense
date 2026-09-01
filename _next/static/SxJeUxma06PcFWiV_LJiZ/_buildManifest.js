self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/Princeton-Tower-Defense/og.png",
        "destination": "/Princeton-Tower-Defense/og"
      }
    ],
    "beforeFiles": [
      {
        "source": "/Princeton-Tower-Defense//_next/:path+",
        "destination": "/Princeton-Tower-Defense/_next/:path+"
      }
    ],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()