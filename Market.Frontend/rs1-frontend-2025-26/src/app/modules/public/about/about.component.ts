import { Component } from '@angular/core';

interface FaqItem {
  q: string;
  a: string;
  open: boolean;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  faqs: FaqItem[] = [
    {
      q: 'Koliko godina treba imati za ulaz?',
      a: 'Ulaz je dozvoljen osobama starijim od 18 godina. Potrebno je imati važeći dokument za identifikaciju.',
      open: false,
    },
    {
      q: 'Da li postoji dress code?',
      a: 'Primjenjujemo smart casual dress code. Sportska obuća i kratke hlače nisu dozvoljene.',
      open: false,
    },
    {
      q: 'Kako rezervisati VIP sto?',
      a: 'VIP stolove možete rezervisati putem telefona ili emaila. Preporučujemo rezervaciju najmanje 48 sati unaprijed.',
      open: false,
    },
    {
      q: 'Da li je parking dostupan?',
      a: 'Besplatan parking je dostupan u neposrednoj blizini kluba. Kapacitet je ograničen, pa preporučujemo dolazak taksijem vikendom.',
      open: false,
    },
    {
      q: 'Koje metode plaćanja prihvatate?',
      a: 'Prihvatamo gotovinu i sve kartice. Na baru je dostupno i plaćanje mobilnim aplikacijama.',
      open: false,
    },
    {
      q: 'Mogu li donijeti vlastita pića?',
      a: 'Unošenje vlastitih pića i hrane nije dozvoljeno. Nudimo bogatu selekciju pića po pristupačnim cijenama.',
      open: false,
    },
  ];

  toggle(faq: FaqItem): void {
    faq.open = !faq.open;
  }
}
