import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const audiences = [
  {
    title: "Local businesses",
    description: "Businesses that need steady local visibility and a clearer enquiry process."
  },
  {
    title: "Real estate agencies",
    description: "Teams that rely on listing content, inbound enquiries, and fast lead response."
  },
  {
    title: "Online shops",
    description: "Brands improving product discovery, ad performance, and purchase intent."
  },
  {
    title: "Restaurants and cafes",
    description: "Food and beverage teams using short-form content and practical offers."
  },
  {
    title: "Personal brands",
    description: "Experts building credibility through clear messaging and consistent content."
  },
  {
    title: "Coaches and consultants",
    description: "Service-led businesses that need stronger trust pages and follow-up systems."
  },
  {
    title: "Service businesses",
    description: "Operators who want clearer offers, better conversion flow, and less manual admin."
  },
  {
    title: "Startups",
    description: "Early teams building scalable marketing and operational foundations."
  }
];

export function WhoWeHelp() {
  return (
    <section className="section-spacing">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Who We Help</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          We work with practical teams that want cleaner execution across marketing, websites, and
          follow-up operations, from local and service businesses to online brands in Myanmar and
          international markets.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <Card key={audience.title}>
              <CardHeader>
                <CardTitle className="text-base">{audience.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
