export async function getProductes() {
  const response = await fetch('./productes.json');
  const data = await response.json();
  return data.productes;
}