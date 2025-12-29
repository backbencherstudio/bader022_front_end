import ChooseThePerfectPlan from "./_components/ChooseThePerfectPlan";
import FrequentlyAskedQuestions from "./_components/FrequentlyAskedQuestions";
import WhyChooseBokli from "./_components/WhyChooseBokli";

/** @format */
export default function HomePage() {
  return (
    <section className="">
      <ChooseThePerfectPlan />
      <WhyChooseBokli />
      <FrequentlyAskedQuestions />
    </section>
  );
}
