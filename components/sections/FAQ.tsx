import Link from "next/link";
import { faqs } from "@/lib/data/faqs";
import { Button } from "@/components/ui/button";

export function FAQ() {
  return (
    <section id="faq" className="section-spacing bg-white">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Practical questions about scope, delivery, and what working together actually looks like.
        </p>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 open:bg-white"
            >
              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work">
            <Button variant="outline">View Work</Button>
          </Link>
          <Link href="#contact">
            <Button>Book a Free Strategy Call</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
