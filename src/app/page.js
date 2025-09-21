"use client"
import CharacterList from '../../components/CharacterList';
import CharacterFavorites from '../../components/CharacterFavorites';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/client';

const Home = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
      async function fetchData() {
        // const { data, error } = await supabase.from('starwars').select('*').ilike("name", "%A%");
        // const { data, error } = await supabase.from('starwars').select('*').like("name", "%A%");
        const { data, error } = await supabase.from('starwars').select('*');
        if (error) console.error('Error fetching data:', error.message);
        else setData(data);
        // addTodo("Anakin")
      }
      fetchData();
    }, []);

  return (
    <div className="min-h-screen">
      <div>
          <h1 className="text-4xl font-semibold mb-8">Chars in Supabase</h1>
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name} {item.isCompleted ? "FAV": "NOT FAV"}</li>
            ))}
          </ul>
        </div>
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-8">Star Wars Characters</h1>
        <Tabs defaultValue="characters" >
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
