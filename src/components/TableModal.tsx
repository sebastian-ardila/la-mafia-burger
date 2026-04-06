import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X, QrCode, ArrowLeft, Camera, CheckCircle } from '@phosphor-icons/react'
import { MdTableRestaurant } from 'react-icons/md'
import { useTable } from '@/context/TableContext'

const TOTAL_TABLES = 10

interface Props {
  onClose: () => void
}

export default function TableModal({ onClose }: Props) {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const { tableNumber, setTableNumber, hasTable } = useTable()
  const [mode, setMode] = useState<'menu' | 'qr' | 'confirmed'>('menu')
  const [confirmedNumber, setConfirmedNumber] = useState('')
  const [qrError, setQrError] = useState('')
  const scannerRef = useRef<HTMLDivElement>(null)
  const scannerInstanceRef = useRef<any>(null)

  const handleSelect = (n: number) => {
    setTableNumber(String(n))
    onClose()
  }

  const handleClear = () => {
    setTableNumber('')
    onClose()
  }

  const showConfirmation = (mesa: string) => {
    setConfirmedNumber(mesa)
    setMode('confirmed')
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const stopScanner = async () => {
    if (scannerInstanceRef.current) {
      try {
        await scannerInstanceRef.current.stop()
        scannerInstanceRef.current.clear()
      } catch {}
      scannerInstanceRef.current = null
    }
  }

  const startScanner = async () => {
    setMode('qr')
    setQrError('')

    const { Html5Qrcode } = await import('html5-qrcode')

    await new Promise(r => setTimeout(r, 100))

    if (!scannerRef.current) return

    const scannerId = 'qr-reader'
    scannerRef.current.id = scannerId

    try {
      const scanner = new Html5Qrcode(scannerId)
      scannerInstanceRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 200, height: 200 } },
        (decodedText: string) => {
          let mesa = ''
          try {
            const url = new URL(decodedText)
            const params = new URLSearchParams(url.hash.split('?')[1] || url.search)
            mesa = params.get('mesa') || ''
          } catch {
            if (/^\d+$/.test(decodedText.trim())) {
              mesa = decodedText.trim()
            }
          }

          if (mesa) {
            stopScanner()
            setTableNumber(mesa)
            showConfirmation(mesa)
          }
        },
        () => {}
      )
    } catch (err) {
      setQrError(isEn ? 'Could not access camera. Please allow camera permissions.' : 'No se pudo acceder a la cámara. Permite el acceso a la cámara.')
    }
  }

  const isMobile = /Android|iPhone|iPad|iPod|HarmonyOS|Huawei|HUAWEI/i.test(navigator.userAgent)

  useEffect(() => {
    return () => { stopScanner() }
  }, [])

  // Fullscreen confirmation overlay
  if (mode === 'confirmed') {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 animate-fade-in">
        <div className="text-center px-8">
          <CheckCircle size={72} weight="fill" className="mx-auto text-brand mb-4" />
          <p className="text-brand/60 text-sm uppercase tracking-widest mb-2">
            {isEn ? 'Table assigned' : 'Mesa asignada'}
          </p>
          <p className="text-white font-display text-5xl md:text-7xl font-bold">
            {isEn ? 'Table' : 'Mesa'} {confirmedNumber}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => { stopScanner(); onClose() }} />
      <div className="relative bg-[#e8dace] rounded-2xl w-full max-w-sm mx-4 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-black/5">
          {mode === 'qr' && (
            <button onClick={() => { stopScanner(); setMode('menu') }} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors mr-2">
              <ArrowLeft size={18} />
            </button>
          )}
          <h3 className="font-display font-semibold text-lg flex items-center gap-2 flex-1">
            <MdTableRestaurant size={22} />
            {mode === 'qr'
              ? (isEn ? 'Scan QR' : 'Escanear QR')
              : (isEn ? 'Select your table' : 'Selecciona tu mesa')
            }
          </h3>
          <button onClick={() => { stopScanner(); onClose() }} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {mode === 'menu' && (
            <div className="space-y-5">
              {hasTable && (
                <div className="text-center py-2">
                  <p className="text-black/50 text-sm">{isEn ? 'Currently at' : 'Actualmente en'}</p>
                  <p className="text-2xl font-bold mt-1">{isEn ? 'Table' : 'Mesa'} {tableNumber}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-3">
                  {isEn ? 'Choose a table' : 'Elige una mesa'}
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: TOTAL_TABLES }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => handleSelect(n)}
                      className={`h-12 rounded-xl font-bold text-lg transition-colors ${
                        tableNumber === String(n)
                          ? 'bg-black text-brand'
                          : 'bg-brand/30 text-black/70 hover:bg-brand/50'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {isMobile && (
                <button
                  onClick={startScanner}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-brand/30 hover:bg-brand/50 transition-colors"
                >
                  <Camera size={22} weight="duotone" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{isEn ? 'Scan QR code' : 'Escanear código QR'}</div>
                    <div className="text-xs text-black/50">{isEn ? 'Use your camera' : 'Usa tu cámara'}</div>
                  </div>
                </button>
              )}

              {hasTable && (
                <button
                  onClick={handleClear}
                  className="w-full text-sm text-black/40 hover:text-black/60 text-center py-1 transition-colors"
                >
                  {isEn ? 'Remove table' : 'Quitar mesa'}
                </button>
              )}
            </div>
          )}

          {mode === 'qr' && (
            <div className="space-y-4">
              <div
                ref={scannerRef}
                className="w-full aspect-square rounded-xl overflow-hidden bg-black"
              />
              {qrError && (
                <p className="text-amber-800 text-sm text-center">{qrError}</p>
              )}
              <p className="text-xs text-black/40 text-center">
                {isEn ? 'Point your camera at the QR code on the table' : 'Apunta tu cámara al código QR de la mesa'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
