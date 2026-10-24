<!-- A gallery of every component, for looking at them with `pnpm exec vite dev`. Not part of the package. -->
<script lang="ts">
  import {
    Alert,
    Autocomplete,
    Button,
    Card,
    FormField,
    Heading,
    Input,
    Label,
    Link,
    NumberInput,
    PageContainer,
    Select,
    Switch,
    Text,
  } from '$lib/index.js';

  let name = $state('');
  let servings = $state(2);
  let enabled = $state(true);
  let cuisine = $state('');
  let ingredient = $state('');
  const ingredients = ['basil', 'butter', 'beans'];
</script>

<PageContainer>
  <Heading level={1}>platform-ui</Heading>
  <Text>Every component, with its default look.</Text>

  <Card title="Buttons">
    <Button>Primary</Button>
    <Button variant="default">Default</Button>
    <Button disabled>Disabled</Button>
    <Link href="#top">A link</Link>
  </Card>

  <Card title="Forms" collapsible>
    <FormField label="Name" id="name">
      <Input id="name" bind:value={name} placeholder="Jane" />
    </FormField>
    <Label for="servings">Servings</Label>
    <NumberInput id="servings" bind:value={servings} />
    <Switch id="enabled" bind:checked={enabled} />
    <Select
      bind:value={cuisine}
      options={[
        { value: 'thai', label: 'Thai' },
        { value: 'mexican', label: 'Mexican' },
      ]}
    />
    <Autocomplete
      bind:value={ingredient}
      placeholder="Ingredient"
      suggestions={ingredients.filter((i) => i.startsWith(ingredient)).map((i) => ({ id: i, label: i }))}
    />
  </Card>

  <Alert variant="error">Something went wrong.</Alert>
</PageContainer>
