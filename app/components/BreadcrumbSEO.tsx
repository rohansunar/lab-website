import Link from 'next/link';

interface BreadcrumbProps {
  name: string;
  location: string;
  area: string;
}

const generateBreadcrumbSchema = ({name, location, area}: BreadcrumbProps) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://healthquicklab.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pathology Labs",
        "item": "https://healthquicklab.com/pathology"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location,
        "item": `https://healthquicklab.com/pathology/${location.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": area,
        "item": `https://healthquicklab.com/pathology/${location.toLowerCase()}/${area.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": name,
        "item": `https://healthquicklab.com/pathology/${location.toLowerCase()}/${area.toLowerCase()}/${name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ]
  };
};

export default function BreadcrumbSEO({ name, location, area }: BreadcrumbProps) {
  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema({ name, location, area }))
        }}
      />

      {/* Visual Breadcrumb */}
      <nav 
        className="bg-white border-b sticky top-[64px] z-40 backdrop-blur-sm bg-white/90"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center h-12">
              <ol 
                className="flex items-center text-sm"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                <li 
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center"
                >
                  <Link 
                    href="/"
                    className="text-gray-600 hover:text-gray-800"
                    itemProp="item"
                  >
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                  <span className="mx-2 text-gray-500">/</span>
                </li>

                <li 
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center"
                >
                  <Link 
                    href="/pathology"
                    className="text-gray-600 hover:text-gray-800"
                    itemProp="item"
                  >
                    <span itemProp="name">Pathology Labs</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                  <span className="mx-2 text-gray-500">/</span>
                </li>

                <li 
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center"
                >
                  <Link 
                    href={`/pathology/${location.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-800"
                    itemProp="item"
                  >
                    <span itemProp="name">{location}</span>
                  </Link>
                  <meta itemProp="position" content="3" />
                  <span className="mx-2 text-gray-500">/</span>
                </li>

                <li 
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center"
                >
                  <span 
                    className="text-gray-600"
                    itemProp="name"
                  >
                    {area}
                  </span>
                  <meta 
                    itemProp="item" 
                    content={`https://healthquicklab.com/pathology/${location.toLowerCase()}`}
                  />
                  <meta itemProp="position" content="4" />
                  <span className="mx-2 text-gray-500">/</span>
                </li>

                <li 
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center"
                >
                  <span 
                    className="text-gray-600"
                    itemProp="name"
                  >
                    {name}
                  </span>
                  <meta 
                    itemProp="item" 
                    content={`https://healthquicklab.com/pathology/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <meta itemProp="position" content="5" />
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 