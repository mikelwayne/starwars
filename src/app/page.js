import CharacterList from '../../components/CharacterList';
import CharacterFavorites from '../../components/CharacterFavorites';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Home = () => {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-8">Star Wars Characters</h1>
        <Tabs defaultValue="characters" className="w-[800px]">
          <TabsList>
            <TabsTrigger value="characters" >Characters</TabsTrigger>
            <TabsTrigger value="favorites">Only Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="characters">
            <CharacterList />
          </TabsContent>
          <TabsContent value="favorites">
            <CharacterFavorites />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
