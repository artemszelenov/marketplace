import { Show, Switch, Match } from "solid-js";
import { useStore } from '@nanostores/solid';
import { $cartItems, addOne, currentItem, removeOne } from '../stores/cart'
import { Button } from './ui/Button'
import type { Product } from '@/types/product'

interface Props {
  product: Product
  variant?: 'full' | 'compact'
}

export function AddToCart({ product, variant = 'compact' }: Props) {
  const current = currentItem(product)

  return (
    <>
      <Show
        when={product.inStockCount > 0}
        fallback={
          <p class="mt-1 text-sm text-grey">
            Товар закончился
          </p>
        }
      >
        <div class="-mt-1.5 -mr-2">
          <Show
            when={current}
            fallback={
              <div class="flex justify-end">
                <Switch>
                  <Match when={variant === 'compact'}>
                    <Button
                      title="Добавить в корзину"
                      variant="iconLink"
                      onClick={() => addOne(product)}
                    >
                      <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v128M320 320H192M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"/>
                      </svg>
                    </Button>
                  </Match>
                  <Match when={variant === 'full'}>
                    <Button
                      title="Добавить в корзину"
                      variant="iconPrimary"
                      onClick={() => addOne(product)}
                    >
                      <>
                        <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 256v128M320 320H192M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"/>
                        </svg>
                        <span class="text-base font-medium">В корзину</span>
                      </>
                    </Button>
                  </Match>
                </Switch>
              </div>
            }
          >
            <div class="flex justify-between items-center">
              <p class="text-sm font-semibold mr-4">
                {current.quantity + ' шт.'}
              </p>

              <div class="flex items-center">
                <Show
                  when={current.quantity === 1}
                  fallback={
                    <Button
                      title="Убрать"
                      variant="iconLink"
                      onClick={() => removeOne(product)}
                    >
                      <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                        <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 256H176"/>
                      </svg>
                    </Button>
                  }
                >
                  <Button
                    title="Удалить"
                    variant="iconLink"
                    extraClasses="text-red"
                    onClick={() => removeOne(product)}
                  >
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                      <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="currentColor" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" fill-opacity="0.1"/>
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192M192 320l128-128"/>
                    </svg>
                  </Button>
                </Show>

                <Show
                  when={current.quantity === product.inStockCount}
                  fallback={
                    <Button
                      title="Добавить еще"
                      variant="iconLink"
                      onClick={() => addOne(product)}
                    >
                      <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                        <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v160M336 256H176"/>
                      </svg>
                    </Button>
                  }
                >
                  <Button
                    title="Больше нет в наличии"
                    variant="iconLink"
                    disabled
                  >
                    <svg class="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                      <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" fill-opacity="0.1"/>
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/>
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"/>
                      <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/>
                    </svg>
                  </Button>
                </Show>
              </div>
            </div>
          </Show>
        </div>
      </Show>
    </>
  )
}